# frozen_string_literal: true

module Api
  module V1
    class InvitationsController < Api::V1::ApplicationController
      before_action :find_user, only: %i[create index destroy]
      before_action :find_friend, only: %i[create accept reject]

      def index
        invitations =
          case params[:type]
          when 'friends'
            @user.friends
          when 'subscribers'
            @user.subscribers
          when 'inviters'
            @user.inviters
          else
            render json: { error: 'Missing type param' }, status: :bad_request

            return
          end

        render json: invitations, include: { user: :interests, friend: :interests }, root: 'invitations'
      end

      def create
        invitation = @user.own_invitations.build(friend_id: @friend.id)

        if invitation.save
          render json: invitation
        else
          render json: { error: invitation.errors.messages }, status: :unprocessable_entity
        end
      end

      def destroy
        invitation = @user.own_invitations.find(params[:id])

        if invitation.destroy
          head :no_content
        else
          render json: { error: invitation.errors.messages }, status: :unprocessable_entity
        end
      end

      def accept
        invitation = @friend.received_invitations.find(params[:id])

        if invitation.update(status: 'accepted')
          render json: invitation
        else
          render json: { error: invitation.errors.messages }, status: :unprocessable_entity
        end
      end

      def reject
        invitation = @friend.received_invitations.find(params[:id])

        if current_user.id == invitation.user_id
          invitation.user_id, invitation.friend_id = invitation.friend_id, invitation.user_id
        end

        if invitation.update(status: 'rejected')
          render json: invitation
        else
          render json: { error: invitation.errors.messages }, status: :unprocessable_entity
        end
      end

      private

      def find_friend
        @friend = User.find_by(id: params[:friend_id])

        render json: { error: 'Friend not found' }, status: :not_found unless @friend
      end

      def find_user
        @user = User.find_by(id: params[:user_id])

        render json: { error: 'User not found' }, status: :not_found unless @user
      end
    end
  end
end

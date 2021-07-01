# frozen_string_literal: true

module Api
  module V1
    class InvitationsController < Api::V1::ApplicationController
      before_action :find_user, only: %i[create index accept reject]
      before_action :find_friend, only: [:create]

      def index
        invitations =
          case params[:type]
          when 'friends'
            Invitation.accepted.where(user_id: current_user.id)
                      .or(Invitation.accepted.where(friend_id: current_user.id))
          when 'subscribers'
            Invitation.rejected.where(friend_id: current_user.id)
          when 'inviters'
            Invitation.pending.where(friend_id: current_user.id)
          else
            render json: { error: 'Missing type param' }, status: :bad_request

            return
          end

        render json: invitations.preload(:user, :friend)
      end

      def create
        invitation = @user.own_invitations.build(friend_id: @friend.id)

        if invitation.save
          render json: invitation
        else
          render json: { error: invitation.errors.messages }, status: :unprocessable_entity
        end
      end

      def accept
        invitation = @user.received_invitations.find(params[:id])

        if invitation.update(status: 'accepted')
          render json: invitation
        else
          render json: { error: invitation.errors.messages }, status: :unprocessable_entity
        end
      end

      def reject
        invitation = @user.received_invitations.find(params[:id])

        if invitation.update(status: 'rejected')
          render json: invitation
        else
          render json: { error: invitation.errors.messages }, status: :unprocessable_entity
        end
      end

      private

      def find_friend
        @friend ||= User.find params[:friend_id]
      end

      def find_user
        @user ||= User.find params[:user_id]
      end
    end
  end
end

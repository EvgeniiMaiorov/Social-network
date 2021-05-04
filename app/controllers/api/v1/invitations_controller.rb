# frozen_string_literal: true

module Api
  module V1
    class InvitationsController < ActionController::API
      before_action :find_user, only: %i[create index accept reject]
      before_action :find_friend, only: [:create]

      def index
        invitations = @user.invitations

        render json: InvitationSerializer.new(invitations)
      end

      def create
        invitation = @user.own_invitations.build(friend_id: @friend.id)

        if invitation.save
          render json: InvitationSerializer.new(invitation)
        else
          render json: { error: invitation.errors.messages }, status: :unprocessable_entity
        end
      end

      def accept
        invitation = @user.received_invitations.find(params[:id])

        if invitation.update(status: 'accepted')
          render json: InvitationSerializer.new(invitation)
        else
          render json: { error: invitation.errors.messages }, status: :unprocessable_entity
        end
      end

      def reject
        invitation = @user.received_invitations.find(params[:id])

        if invitation.update(status: 'rejected')
          render json: InvitationSerializer.new(invitation)
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

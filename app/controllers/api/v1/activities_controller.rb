# frozen_string_literal: true

module Api
  module V1
    class ActivitiesController < Api::V1::ApplicationController
      before_action :find_friends

      def index
        friend_activities = Activity.includes(:user).where(user_id: @friends_id).order(id: :desc).limit(4)

        render json: friend_activities, include: '*'
      end

      private

      def find_friends
        @friends_id = current_user.friends.map do |invitation|
          current_user.id == invitation.user_id ? invitation.friend_id : invitation.user_id
        end
      end
    end
  end
end

# frozen_string_literal: true

module Api
  module V1
    class UsersController < Api::V1::ApplicationController
      before_action :find_user, only: %i[show update destroy online_status]

      def index
        users =
          case params[:type]
          when '90_percent'
            user_by_interest(90)
          when '50_percent'
            user_by_interest(50)
          when 'online_friends'
            current_user.friends.map do |invitation|
              friend =
                if invitation.user_id == current_user.id
                  invitation.friend
                else
                  invitation.user
                end

              friend if friend.online?
            end.compact
          else
            render json: { error: 'Missing type param' }, status: :bad_request

            return
          end

        render json: users, root: 'users'
      end

      def show
        render json: @user
      end

      def update
        if @user.update(user_params)
          render json: @user
        else
          render json: { error: @user.errors.messages }, status: :unprocessable_entity
        end
      end

      def update_user_interests
        current_user.interest_ids = params[:interest_ids]
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Invalid interest id' }, status: :not_found
      end

      def destroy
        if @user.destroy
          head :no_content
        else
          render json: { error: @user.errors.messages }, status: :unprocessable_entity
        end
      end

      def online_since
        current_user.update(online_since: Time.now.utc)

        head :no_content
      end

      def online_status
        render json: @user.is_online, staus: :ok
      end

      def location
        current_user.update(location: params[:location])

        head :no_content
      end

      private

      def user_by_interest(percent)
        current_user_interests = current_user.user_interests.pluck(:interest_id)
        UserInterest.where(interest_id: current_user_interests)
                    .includes(:user)
                    .group(:user_id)
                    .where.not(user_id: current_user.id)
                    .select('user_id, ARRAY_AGG(interest_id) as interest_ids')
                    .select do |user_interest|
                      intersection = user_interest.interest_ids.intersection(current_user_interests).count

                      intersection > current_user_interests.count / 100.0 * percent
                    end.map(&:user)
      end

      def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :photo)
      end

      def find_user
        @user = User.find_by(id: params[:id])

        render json: { error: 'User not found' }, status: :not_found unless @user
      end
    end
  end
end

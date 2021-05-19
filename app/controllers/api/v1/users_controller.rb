# frozen_string_literal: true

module Api
  module V1
    class UsersController < Api::V1::ApplicationController
      before_action :find_user, only: %i[show update destroy]
      before_action :authenticate_user!

      def index
        users = User.all

        render json: users
      end

      def show
        render json: @user
      end

      def create
        user = User.new(user_params)

        if user.save
          render json: user
        else
          render json: { error: user.errors.messages }, status: :unprocessable_entity
        end
      end

      def update
        if @user.update(user_params)
          render json: @user
        else
          render json: { error: @user.errors.messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @user.destroy
          head :no_content
        else
          render json: { error: @user.errors.messages }, status: :unprocessable_entity
        end
      end

      def user
        render json: current_user
      end

      private

      def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :photo_url)
      end

      def find_user
        @user = User.find_by(id: params[:id])

        render json: { error: 'User not found' }, status: :not_found unless @user
      end
    end
  end
end

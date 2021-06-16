# frozen_string_literal: true

module Api
  module V1
    class PostsController < Api::V1::ApplicationController
      before_action :find_post, only: %i[update destroy]

      def index
        posts = Post.where(user_id: params[:user_id])

        render json: posts
      end

      def show
        post = Post.find_by(id: params[:id])

        render json: post
      end

      def create
        post = current_user.posts.build(post_params)

        if post.save
          render json: post
        else
          render json: { error: post.errors.messages }, status: :unprocessable_entity
        end
      end

      def update
        if @post.update(post_params)
          render json: @post
        else
          render json: { error: @post.errors.messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @post.destroy
          head :no_content
        else
          render json: { error: @post.errors.messages }, status: :unprocessable_entity
        end
      end

      private

      def post_params
        params.require(:post).permit(:title, :body, :image)
      end

      def find_post
        @post = current_user.posts.find_by(id: params[:id])

        render json: { error: 'Post not found' }, status: :not_found unless @post
      end
    end
  end
end

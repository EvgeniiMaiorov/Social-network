# frozen_string_literal: true

module Api
  module V1
    class PostsController < Api::V1::ApplicationController
      before_action :find_post, only: %i[update destroy like]

      def index
        posts = Post.where(user_id: params[:user_id]).includes(:tags, comments: :user).order(published_at: :desc)

        posts = posts.published if current_user.id != params[:user_id].to_i

        render json: posts, current_user: current_user, include: [:tags, {comments: :user}]
      end

      def show
        post = Post.find_by(id: params[:id])

        render json: post
      end

      def create
        post = current_user.posts.build(post_params)

        handle_update(post)
      end

      def update
        @post.assign_attributes(post_params)

        handle_update(@post)
      end

      def destroy
        if @post.destroy
          head :no_content
        else
          render json: { error: @post.errors.messages }, status: :unprocessable_entity
        end
      end

      def like
        like = @post.likes.find_or_initialize_by(user_id: current_user.id)
        like.status = params[:status]

        if like.save
          render json: @post, current_user: current_user
        else
          render json: { error: like.errors.messages }, status: :unprocessable_entity
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

      def handle_update(post)
        result = UpdatePostService.new(post, params).call

        if result.success?
          render json: result.post
        else
          render json: { error: result.errors }, status: :unprocessable_entity
        end
      end
    end
  end
end

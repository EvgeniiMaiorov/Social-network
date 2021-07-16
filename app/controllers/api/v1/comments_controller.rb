# frozen_string_literal: true

module Api
  module V1
    class CommentsController < Api::V1::ApplicationController
      before_action :find_comment, only: %i[update destroy]

      def index
        comments = Comment.all

        render json: comments
      end

      def show
        comment = Comment.find_by(id: params[:id])

        render json: comment
      end

      def create
        post = Post.find_by(id: params[:post_id])
        comment = post.comments.build(comment_params)
        comment.user = current_user

        if comment.save
          render json: comment
        else
          render json: { error: comment.errors.messages }, status: :unprocessable_entity
        end
      end

      def update
        if @comment.update(comment_params)
          render json: @comment
        else
          render json: { error: @comment.errors.messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @comment.destroy
          head :no_content
        else
          render json: { error: @comment.errors.messages }, status: :unprocessable_entity
        end
      end

      private

      def comment_params
        params.require(:comment).permit(:body)
      end

      def find_comment
        @comment = current_user.comments.find_by(id: params[:id])

        render json: { error: 'Comment not found' }, status: :not_found unless @comment
      end
    end
  end
end

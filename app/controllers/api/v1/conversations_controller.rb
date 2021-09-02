# frozen_string_literal: true

module Api
  module V1
    class ConversationsController < Api::V1::ApplicationController
      before_action :find_conversation

      def index
        conversations = current_user.conversations

        render json: conversations, root: 'conversations'
      end

      def create
        conversation =
          current_user
          .conversations
          .includes(:users)
          .find { |conversation| conversation.users.any? { |user| user.id == params[:user_id] } }

        if conversation

          render json: conversation

          return
        end

        conversation = Conversation.new
        conversation.user_ids = [current_user.id, params[:user_id]]

        if conversation.save
          # serialized_data = ConversationSerializer.new(conversation)
          # ActionCable.server.broadcast 'conversations_channel', serialized_data

          render json: conversation, current_user: current_user
        else
          render json: { error: conversation.errors.messages }, status: :unprocessable_entity
        end
      end


      private

      def find_conversation
        @conversation = Conversation.where(id: params[:id])
      end
    end
  end
end

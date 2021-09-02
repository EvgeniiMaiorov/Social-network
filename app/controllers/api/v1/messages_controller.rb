# frozen_string_literal: true

module Api
  module V1
    class MessagesController < ApplicationController
      def index
        messages = current_user.conversations.find(params[:conversation_id]).messages

        render json: messages, root: 'messages'
      end

      def create
        message = current_user.messages.build(message_params)
        message.conversation = Conversation.find(params[:conversation_id])

        return unless message.save

        render json: message
        # serialized_data = MessageSerializer.new(message)
        # MessagesChannel.broadcast_to conversation, serialized_data
        # head :ok
      end

      private

      def message_params
        params.require(:message).permit(:body)
      end
    end
  end
end

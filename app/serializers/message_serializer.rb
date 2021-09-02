# frozen_string_literal: true

class MessageSerializer < ActiveModel::Serializer
  attributes :id, :conversation_id, :body, :created_at

  belongs_to :user
end

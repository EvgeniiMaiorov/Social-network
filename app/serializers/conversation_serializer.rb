# frozen_string_literal: true

class ConversationSerializer < ActiveModel::Serializer
  attributes :id

  has_many :users
end

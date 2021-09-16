# frozen_string_literal: true

class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at

  belongs_to :user
  belongs_to :post
end

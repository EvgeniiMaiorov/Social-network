# frozen_string_literal: true

class Like < ApplicationRecord
  belongs_to :user
  belongs_to :post

  scope :liked, -> { where(status: :like) }
  scope :disliked, -> { where(status: :dislike) }

  validates :user, :post, :status, presence: true
end

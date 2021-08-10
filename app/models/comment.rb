# frozen_string_literal: true

class Comment < ApplicationRecord
  include Activities

  belongs_to :user
  belongs_to :post

  has_many :activities, as: :activeble, dependent: :destroy

  validates :body, presence: true
end

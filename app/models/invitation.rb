# frozen_string_literal: true

class Invitation < ApplicationRecord
  include Activities

  belongs_to :user
  belongs_to :friend, class_name: 'User'

  has_many :activities, as: :activeble, dependent: :destroy

  enum status: { accepted: 'accepted', pending: 'pending', rejected: 'rejected' }

  validates :user_id, uniqueness: { scope: :friend_id }
end

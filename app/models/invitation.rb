# frozen_string_literal: true

class Invitation < ApplicationRecord
  belongs_to :user
  scope :accepted, -> { where(status: 'accepted') }
  scope :pending, -> { where(status: 'pending') }
  scope :rejected, -> { where(status: 'rejected') }
  belongs_to :friend, class_name: 'User'

  validates :user_id, uniqueness: { scope: :friend_id }
  validates :friend_id, uniqueness: { scope: :user_id }
end

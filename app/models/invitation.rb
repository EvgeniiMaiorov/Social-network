# frozen_string_literal: true

class Invitation < ApplicationRecord
  belongs_to :user
  scope :accepted, -> { where(status: 'accepted') }
  scope :pending, -> { where(status: 'pending') }
  scope :rejected, -> { where(status: 'rejected') }
end

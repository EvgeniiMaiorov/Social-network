# frozen_string_literal: true

class Activity < ApplicationRecord
  belongs_to :activeble, polymorphic: true, optional: true
  belongs_to :user

  validates :activity_type, presence: true
end

# frozen_string_literal: true

class Activity < ApplicationRecord
  belongs_to :activeble, polymorphic: true, optional: true

  validates :activity_type, presence: true
end

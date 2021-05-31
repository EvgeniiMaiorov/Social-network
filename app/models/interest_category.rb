# frozen_string_literal: true

class InterestCategory < ApplicationRecord
  has_many :interests, dependent: :destroy

  accepts_nested_attributes_for :interests, allow_destroy: true

  validates :category_name, uniqueness: true
end

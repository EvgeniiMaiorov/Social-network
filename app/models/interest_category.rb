# frozen_string_literal: true

class InterestCategory < ApplicationRecord
  has_many :interests, dependent: :destroy
end

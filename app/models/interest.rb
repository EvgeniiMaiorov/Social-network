# frozen_string_literal: true

class Interest < ApplicationRecord
  belongs_to :interest_category

  has_many :user_interests, dependent: :destroy
  has_many :users, through: :user_interests

  validates :name, uniqueness: true
end

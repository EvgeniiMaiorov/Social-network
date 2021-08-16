# frozen_string_literal: true

class Tag < ApplicationRecord
  has_and_belongs_to_many :posts

  before_validation :correct_name

  validates :name, format: { without: /(\s|[A-Z]+)/ }, presence: true

  private

  def correct_name
    self.name = name.downcase.tr(' ', '')
  end
end

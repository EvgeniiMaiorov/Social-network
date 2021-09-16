# frozen_string_literal: true

class Tag < ApplicationRecord
  has_and_belongs_to_many :posts

  before_validation :correct_name

  validates :name, format: { without: /(\s|[A-Z]+)/ }, presence: true

  searchkick match: :text_middle

  def search_data
    {
      name: name
    }
  end

  private

  def correct_name
    self.name = name.downcase.tr(' ', '')
  end
end

# frozen_string_literal: true

class InterestCategorySerializer < ActiveModel::Serializer
  attributes :id, :category_name

  has_many :interests
end

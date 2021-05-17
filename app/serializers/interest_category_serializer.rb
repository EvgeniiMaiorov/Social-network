# frozen_string_literal: true

class InterestCategorySerializer
  include FastJsonapi::ObjectSerializer

  has_many :interests

  attributes :category_name
end

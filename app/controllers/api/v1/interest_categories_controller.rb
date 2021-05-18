# frozen_string_literal: true

module Api
  module V1
    class InterestCategoriesController < Api::V1::ApplicationController
      def index
        interest_categories = InterestCategory.all

        render json: interest_categories, include: [:interests]
      end
    end
  end
end

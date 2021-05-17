# frozen_string_literal: true

module Api
  module V1
    class InterestsController < Api::V1::ApplicationController
      def index
        interests = Interest.all

        render json: InterestSerializer.new(interests)
      end
    end
  end
end

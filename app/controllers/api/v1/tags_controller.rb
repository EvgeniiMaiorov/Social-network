# frozen_string_literal: true

module Api
  module V1
    class TagsController < Api::V1::ApplicationController
      def index
        tags = Tag.all

        render json: tags
      end
    end
  end
end

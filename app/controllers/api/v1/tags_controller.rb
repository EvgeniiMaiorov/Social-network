# frozen_string_literal: true

module Api
  module V1
    class TagsController < Api::V1::ApplicationController
      def index
        tags = Tag.all

        if params[:search].present?
          tags =
            Tag.search(params[:search])
        end

        render json: tags, root: 'tags'
      end
    end
  end
end

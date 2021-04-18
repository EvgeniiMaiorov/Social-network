# frozen_string_literal: true

class PagesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:auth]

  def index; end

  def auth; end
end

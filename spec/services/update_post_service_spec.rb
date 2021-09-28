# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UpdatePostService, type: :model do
  describe 'update post service type model' do
    let(:user) { create(:user) }
    let!(:post) { build(:post, user: user) }

    context '#call' do
      let!(:invalid_post) { build(:post, user: user, title: '') }
      let(:params) { {} }
      let(:visibility_params) { { visibility: 'false' } }
      let(:tags) { { tags: %w[test testtag tagtest] } }

      it 'returns true' do
        result = UpdatePostService.new(post, params).call

        expect(result.success?).to eq(true)
        expect(post.visibility).to eq(true)
      end

      it 'returns false' do
        result = UpdatePostService.new(invalid_post, params).call

        expect(result.success?).to eq(false)
      end

      it 'returns only for friends posts' do
        UpdatePostService.new(post, visibility_params).call

        expect(post.visibility).to eq(false)
      end

      it 'returns post tags' do
        UpdatePostService.new(post, tags).call

        expect(post.tags.map(&:name)).to eq(%w[test testtag tagtest])
      end
    end
  end
end

# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::TagsController, type: :controller do
  describe 'tags type controller' do
    let(:user) { create(:user) }

    before { sign_in user }

    context '#index' do
      let!(:tags) { create_list(:tag, 5) }

      it 'shows all tags' do
        get :index

        expect(json[:tags].length).to eq(5)
      end
    end

    context 'it searchs tags' do
      let!(:found_tag) { create(:tag, name: 'found') }
      let!(:not_found_tag) { create(:tag, name: 'another_tag') }

      it 'searchs tags' do
        get :index, params: { search: 'found' }

        expect(json[:tags].length).to eq(1)
        expect(json[:tags][0][:id]).to eq(found_tag.id)
        expect(json[:tags][0][:name]).to eq('found')
        expect(response).to have_http_status(200)
      end
    end
  end
end

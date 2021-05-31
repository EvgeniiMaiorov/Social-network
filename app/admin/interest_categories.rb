# frozen_string_literal: true

ActiveAdmin.register InterestCategory do
  permit_params :category_name, interests_attributes: %i[id name _destroy]

  index do
    id_column
    column :category_name
    actions
  end

  filter :category_name

  show do
    panel 'Interests' do
      table_for interest_category.interests do
        column :id
        column :name
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :category_name
      f.has_many :interests, heading: false, class: 'interest-fieldset', allow_destroy: true do |fi|
        fi.input :name, label: false
      end
    end
    f.actions
  end

end

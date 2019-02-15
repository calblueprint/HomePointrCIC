# frozen_string_literal: true

class CreateTenants < ActiveRecord::Migration[5.2]
  def change
    create_table :tenants do |t|
      t.string :name
      t.text :description
      t.string :email
      t.string :phone
      t.integer :rent_min
      t.integer :rent_max
      t.integer :housing_type
      t.integer :property_type
      t.integer :num_bedrooms
      t.integer :location
      t.references :referral_agency, index: true
      t.date :date_needed
      t.timestamps
    end
  end
end

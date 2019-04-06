# frozen_string_literal: true

class CreateProperties < ActiveRecord::Migration[5.2]
  def change
    create_table :properties do |t|
      t.integer :capacity
      t.text :description
      t.integer :number_of_openings
      t.references :landlord, index: true
    end
  end
end

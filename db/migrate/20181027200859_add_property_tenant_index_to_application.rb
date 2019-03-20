# frozen_string_literal: true

class AddPropertyTenantIndexToApplication < ActiveRecord::Migration[5.2]
  def change
    add_index :applications, %i[tenant_id property_id], unique: true
  end
end

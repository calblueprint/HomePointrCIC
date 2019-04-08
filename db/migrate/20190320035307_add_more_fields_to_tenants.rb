class AddMoreFieldsToTenants < ActiveRecord::Migration[5.2]
  def change
    add_column :tenants, :family_size, :integer
    add_column :tenants, :living_arrangements, :string
    add_column :tenants, :income, :string
    add_column :tenants, :benefits, :boolean
    add_column :tenants, :local_council, :boolean
    add_column :tenants, :ex_offender, :boolean
    add_column :tenants, :local_council_status, :string
    add_column :tenants, :local_area_link, :string
  end
end

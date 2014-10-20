class CreateShares < ActiveRecord::Migration
  def change
    create_table :shares do |t|
      t.integer :from_user_id
      t.integer :to_user_id
      t.string :to_email
      t.datetime :created_at
      t.string :url

      t.timestamps
    end
  end
end

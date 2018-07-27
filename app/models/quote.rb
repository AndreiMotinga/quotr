class Quote < ApplicationRecord
  scope :next, -> (id) { where('id > ?', id) }
  scope :previous, -> (id) { where('id < ?', id) }

  def next_id
    self.class.next(id).pluck(:id).first
  end

  def previous_id
    self.class.previous(id).pluck(:id).last
  end
end

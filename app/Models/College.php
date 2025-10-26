<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class College extends Model
{
    protected $fillable = ['name', 'abbreviation', 'dean', 'logo', 'is_archived'];
    public function programs(){
        return $this->hasMany(Program::class);
    }
}
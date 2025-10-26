<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
     protected $fillable = ['college_id', 'name', 'abbreviation', 'training_duration', 'is_archived', 'is_archived'];
}
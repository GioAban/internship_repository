<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostRequirement extends Model
{
        protected $fillable = ['school_year_id', 'program_id', 'title', 'template_file', 'is_required', 'is_archived'];
}
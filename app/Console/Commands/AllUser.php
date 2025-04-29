<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User; 

class AllUser extends Command
{
    /**
     * 
     *
     * @var string
     */
    protected $signature = 'app:all-user';

    /**
     *
     * @var string
     */
    protected $description = 'Select all users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $users = User::all();

        if ($users->isEmpty()) {
            $this->info('No users found.');
        } else {
            $this->info('All Users:');
            foreach ($users as $user) {
                $this->line("ID: {$user->id}, Name: {$user->name}, Email: {$user->email}");
            }
        }
    }
}


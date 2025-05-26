<?php

namespace App\Http\Controllers;

use App\Models\Propriete;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProprieteContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $proprietes = Propriete::with('loueur.user')
        ->with("commodites")
        ->latest()->get();
        
        return Inertia::render("app/property/page",compact("proprietes"));
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $propriete = Propriete::with(['loueur.user', 'commodites'])->findOrFail($id);
            return Inertia::render('app/property/[id]/page', [
                'propriete' => $propriete
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the case where the model is not found
            return response()->json(['message' => 'Propriete not found'], 404);
        }
    }
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Propriete $propriete)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Propriete $propriete)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Propriete $propriete)
    {
        //
    }
}

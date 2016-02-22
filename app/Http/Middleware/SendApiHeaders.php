<?php

namespace App\Http\Middleware;

use Closure;

class SendApiHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // Set the "Access-Control-Allow-Origin" header.
        if (strlen($request->header('Origin'))) {
            $response->header('Access-Control-Allow-Origin', $request->header('Origin'), true);
        }

        // Respond to pre-flighted requests.
        if ($request->method() == 'OPTIONS')
        {
            // Allow the requested method.
            if (in_array($request->header('Access-Control-Request-Method'), ['POST', 'PUT', 'PATCH', 'DELETE'])) {
                $response->header('Access-Control-Allow-Methods', $request->header('Access-Control-Request-Method'), true);
            }
            // Allow requested header.
            if ($request->header('Access-Control-Request-Headers')) {
                $response->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'), true);
            }
        }

        return $response;
    }
}

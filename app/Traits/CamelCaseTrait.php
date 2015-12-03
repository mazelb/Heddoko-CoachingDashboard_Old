<?php
/**
 * Copyright Heddoko(TM) 2015, all rights reserved.
 *
 * @brief   Trait for converting the snake_case keys of a model to camelCase.
 * @author  Francis Amankrah (frank@heddoko.com)
 * @date    November 2015
 */
namespace App\Traits;

trait CamelCaseTrait
{
    /**
     * Converts the model instance to an array, and changes the snake_case keys to camelCase.
     *
     * @return array
     */
    public function toArray()
    {
        $camelCasedAttributes = [];
        $snakeCaseAttributes = parent::toArray();

        foreach ($snakeCaseAttributes as $key => $value) {
            $camelCasedAttributes[camel_case($key)] = $value;
        }

        return $camelCasedAttributes;
    }
}

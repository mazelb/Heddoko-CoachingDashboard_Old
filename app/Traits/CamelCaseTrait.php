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
     * Retrieves an attribute by its camelCase name.
     * @param string $key
     * @param return mixed
     */
    public function getAttribute($key) {
        return parent::getAttribute(snake_case($key));
    }

    /**
     * Assigns a value to a snake_case attribute by accessing its camelCase name.
     *
     * @param string $key
     * @param mixed $value
     * @return mixed
     */
    public function setAttribute($key, $value) {
        return parent::setAttribute(snake_case($key), $value);
    }

    /**
     * Converts the model instance to an array, and changes the snake_case keys to camelCase.
     *
     * @return array
     */
    public function toArray() {
        return $this->convertToCamelCase(parent::toArray());
    }

    /**
     * Convert the model's attributes to an array, and changes the snake_case keys to camelCase.
     *
     * @return array
     */
    public function attributesToArray() {
        return $this->convertToCamelCase(parent::attributesToArray());
    }

    /**
     * Converts an array's keys to camelCase.
     *
     * @param array $snakeCaseAttributes
     * @return array
     */
    protected function convertToCamelCase(array $snakeCaseAttributes)
    {
        $camelCasedAttributes = [];

        foreach ($snakeCaseAttributes as $key => $value) {
            $camelCasedAttributes[camel_case($key)] = $value;
        }

        return $camelCasedAttributes;
    }
}

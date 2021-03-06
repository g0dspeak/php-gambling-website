<?php

namespace Gambling\ConnectFour\Domain\Game;

use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;

final class GameId
{
    /**
     * @var string
     */
    private $gameId;

    /**
     * GameId constructor.
     *
     * @param UuidInterface $uuid
     */
    private function __construct(UuidInterface $uuid)
    {
        $this->gameId = $uuid->toString();
    }

    /**
     * @return GameId
     */
    public static function generate()
    {
        return new self(Uuid::uuid1());
    }

    /**
     * @param $gameId
     *
     * @return GameId
     */
    public static function fromString($gameId)
    {
        return new self(Uuid::fromString($gameId));
    }

    /**
     * @return string
     */
    public function toString()
    {
        return $this->gameId;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->toString();
    }
}

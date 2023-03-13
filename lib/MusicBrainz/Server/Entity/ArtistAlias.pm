package MusicBrainz::Server::Entity::ArtistAlias;

use Moose;
use MusicBrainz::Server::Entity::Types;

extends 'MusicBrainz::Server::Entity::Alias';

with 'MusicBrainz::Server::Entity::Role::Type' => { model => 'ArtistAliasType' };

sub entity_type { 'artist_alias' }

has 'artist_id' => (
    is => 'rw',
    isa => 'Int'
);

has 'artist' => (
    is => 'rw',
    isa => 'Artist'
);

__PACKAGE__->meta->make_immutable;
no Moose;
1;

=head1 COPYRIGHT AND LICENSE

Copyright (C) 2009 Lukas Lalinsky

This file is part of MusicBrainz, the open internet music database,
and is licensed under the GPL version 2, or (at your option) any
later version: http://www.gnu.org/licenses/gpl-2.0.txt

=cut

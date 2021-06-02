$(document).ready(function() {

	// Variables
	var holding = [],
		moves,
		disksNum = 7,
		$canves = $('#canves'),
		$restart = $canves.find('.restart'),
		$tower = $canves.find('.tower'),
		$scorePanel = $canves.find('#score-panel'),
		$movesCount = $scorePanel.find('#moves-num'),
		$ratingStars = $scorePanel.find('i');

	// Init Game
	function initGame(tower) {
		$tower.html('');
		moves = 0;
		$movesCount.html(0);
		holding = [];
		for (var i = 1; i <= disksNum; i++) {
			tower.prepend($('<li class="disk disk-' + i + '" data-value="' + i + '"></li>'));
		}
		$ratingStars.each(function() {
			$(this).removeClass('fa-star-o').addClass('fa-star');
		});
	}
	initGame($tower.eq(0));

	// Game Logic
	function countMove() {
		moves++;
		$movesCount.html(moves);

		if (moves > 126) {
			if ($tower.eq(1).children().length === disksNum || $tower.eq(2).children().length === disksNum) {
				swal({
					allowEscapeKey: false,
					allowOutsideClick: false,
					title: 'Congratulations! You Won!',
					text: "Boom Shaka Lak",
					type: 'success',
					confirmButtonColor: '#8bc34a',
					confirmButtonText: 'Play again!'
				}).then(function(isConfirm) {
					if (isConfirm) {
						initGame($tower.eq(0));
					}
				})
			}
		}
		if (moves > 127) {
			$ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o')
		}
		if (moves > 255) {
			$ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o')
		}
		if (moves > 256) {
			$ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o')
		}
	}

	function tower(tower) {
		var $disks = tower.children(),
			$topDisk = tower.find(':last-child'),
			topDiskValue = $topDisk.data('value'),
			$holdingDisk = $canves.find('.hold');

		if ($holdingDisk.length !== 0) {
			if (topDiskValue === holding[0]) {
				$holdingDisk.removeClass('hold');
			} else if (topDiskValue === undefined || topDiskValue > holding[0]) {
				$holdingDisk.remove();
				tower.append($('<li class="disk disk-' + holding[0] + '" data-value="' + holding[0] + '"></li>'));
				countMove();
			}
		} else if ($topDisk.length !== 0) {
			$topDisk.addClass('hold');
			holding[0] = topDiskValue;
		}
	}

	// Event Handlers
	$canves.on('click', '.tower', function() {
		var $this = $(this);
		tower($this);
	});
	$restart.on('click', function() {
		swal({
				title: 'Are you sure?',
				text: "Your progress will be Lost!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#8bc34a',
				cancelButtonColor: '#e91e63',
				confirmButtonText: 'Yes, Restart Game!'
		}).then(function(isConfirm) {
				if (isConfirm) {
					initGame($tower.eq(0));
				}
			})
	});
});

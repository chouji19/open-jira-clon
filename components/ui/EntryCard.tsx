import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { DragEvent, FC, useContext } from 'react'
import { UIContext } from '../../context/ui'
import { Entry } from '../../interfaces'
import { getFormatDistanceToNow } from '../../utils/dateFunctions'

interface Props{
	entry: Entry,
}

export const EntryCard:FC<Props> = ({entry}) => {

	const { startDragging, endDragging } = useContext(UIContext);
	const router = useRouter();

	const onDragStart = (event: DragEvent<HTMLDivElement>) => {
		event.dataTransfer.setData('text', entry._id);
		startDragging();
	}

	const onDragEnd = () => {
		endDragging();
	}

	const onClick = () => {
	  router.push(`/entries/${entry._id}`)
	}
	
	

	return (
		<Card
			sx={{ marginBottom: 1 }}
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onClick={onClick}
		>
			<CardActionArea>
				<CardContent>
					<Typography sx={{whiteSpace: 'pre-line'}}>{entry.description}</Typography>
				</CardContent>
				<CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
					<Typography variant='body2'>{getFormatDistanceToNow(entry.createdAt)}</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	)
}
